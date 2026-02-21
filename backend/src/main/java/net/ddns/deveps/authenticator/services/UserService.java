package net.ddns.deveps.authenticator.services;

import net.ddns.deveps.authenticator.dto.UserDTO;
import net.ddns.deveps.authenticator.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findById(Long id);
    User save(User user);
    void deleteById(Long id);
    User updateUser(Long id, UserDTO dto);
    boolean validateUser(String username, String rawPassword);
    boolean existsByUsername(String username);
}
