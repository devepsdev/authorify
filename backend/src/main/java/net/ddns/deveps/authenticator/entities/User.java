package net.ddns.deveps.authenticator.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="contactos")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre")
    private String name;
    private String email;
    @Column(name = "nombre_usuario", nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(name = "fecha_registro", insertable = false, updatable = false)
    private LocalDateTime localDateTime;

}
