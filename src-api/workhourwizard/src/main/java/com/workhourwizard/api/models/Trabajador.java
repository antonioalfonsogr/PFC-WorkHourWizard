package com.workhourwizard.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "empleado")
public class Trabajador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empleado", unique = true, nullable = false)
    private Long idEmpleado;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "dni", unique = true)
    private String dni;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "cargo")
    private Cargo cargo;

    @ManyToOne
    @JoinColumn(name = "id_gestor")
    private Trabajador gestor;

    @OneToMany(mappedBy = "gestor")
    private List<Trabajador> trabajadoresACargo;

}
