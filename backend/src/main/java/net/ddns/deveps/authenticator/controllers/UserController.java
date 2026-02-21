package net.ddns.deveps.authenticator.controllers;

import jakarta.validation.Valid;
import net.ddns.deveps.authenticator.dto.AuthRequest;
import net.ddns.deveps.authenticator.dto.AuthResponse;
import net.ddns.deveps.authenticator.dto.UserDTO;
import net.ddns.deveps.authenticator.entities.User;
import net.ddns.deveps.authenticator.security.JwtUtil;
import net.ddns.deveps.authenticator.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/user/")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll() {
        List<UserDTO> userDTOList = userService.findAll()
                .stream()
                .map(UserDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(userDTOList);
    }

    @GetMapping("exists/{username}")
    public ResponseEntity<Boolean> existsByUsername(@PathVariable String username) {
        boolean exists = userService.existsByUsername(username);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> ResponseEntity.ok(UserDTO.fromEntity(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> save(@Valid @RequestBody UserDTO userDTO) {
        User savedUser = userService.save(User.builder()
                .name(userDTO.getName())
                .email(userDTO.getEmail())
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .build());
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .replacePath("/api/user/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();

        return ResponseEntity.created(location).body(UserDTO.fromEntity(savedUser));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        if (userService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteById(id);
        return ResponseEntity.ok("Usuario eliminado");
    }

    @PutMapping("{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        User updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(UserDTO.fromEntity(updatedUser));
    }

    @PostMapping("login")
    public ResponseEntity<?> validateUser(@RequestBody AuthRequest authRequest) {
        boolean isValid = userService.validateUser(authRequest.getUsername(), authRequest.getPassword());

        if (isValid) {
            String token = jwtUtil.generateToken(authRequest.getUsername());
            AuthResponse response = new AuthResponse(token, authRequest.getUsername());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }

}
