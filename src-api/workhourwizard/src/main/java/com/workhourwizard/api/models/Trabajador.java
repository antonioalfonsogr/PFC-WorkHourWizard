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
@Table(name = "trabajador")
public class Trabajador {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_trabajador", unique = true, nullable = false)
  private Long idTrabajador;

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

  @OneToMany(fetch = FetchType.LAZY, targetEntity = Trabajador.class)
  private List<Trabajador> trabajadoresACargos;

  @OneToMany(fetch = FetchType.LAZY, targetEntity = RangoHorario.class)
  private List<RangoHorario> rangosHorariosTrabajador;
}
