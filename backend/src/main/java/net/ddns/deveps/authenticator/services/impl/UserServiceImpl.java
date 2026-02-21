package net.ddns.deveps.authenticator.services.impl;

import net.ddns.deveps.authenticator.dto.UserDTO;
import net.ddns.deveps.authenticator.entities.User;
import net.ddns.deveps.authenticator.repositories.UserRepository;
import net.ddns.deveps.authenticator.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        // Verificar si el username ya existe
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(Long id, UserDTO dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        // Verificar si el nuevo username ya existe (y no es el mismo usuario)
        if (!user.getUsername().equals(dto.getUsername()) &&
            userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }
        String hashedPassword = passwordEncoder.encode(dto.getPassword());
        user.setPassword(hashedPassword);
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        return userRepository.save(user);
    }

    @Override
    public boolean validateUser(String username, String rawPassword) {
        return userRepository.findByUsername(username).map(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
                .orElse(false);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

}
