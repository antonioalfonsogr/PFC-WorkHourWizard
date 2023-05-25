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
@EqualsAndHashCode(exclude = {"trabajadoresACargo", "rangosHorariosTrabajador"})
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
  @Enumerated(EnumType.STRING)
  private Cargo cargo;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_gestor")
  private Trabajador gestor;

  @OneToMany(mappedBy = "gestor", fetch = FetchType.LAZY)
  private List<Trabajador> trabajadoresACargo;

  @OneToMany(mappedBy = "trabajador", targetEntity = RangoHorario.class, fetch = FetchType.LAZY)
  private List<RangoHorario> rangosHorariosTrabajador;


}

