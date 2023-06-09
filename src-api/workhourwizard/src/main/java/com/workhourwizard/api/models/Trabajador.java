package com.workhourwizard.api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

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

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "id_gestor")
  @JsonBackReference
  private Trabajador gestor;

  @OneToMany(mappedBy = "gestor", fetch = FetchType.EAGER)
  @JsonManagedReference
  private List<Trabajador> trabajadoresACargo;

  @OneToMany(mappedBy = "trabajador", targetEntity = RangoHorario.class, fetch = FetchType.EAGER)
  @JsonManagedReference
  private List<RangoHorario> rangosHorariosTrabajador;

  // Constructores
  public Trabajador() {}

  public Trabajador(
          Long idTrabajador,
          String nombre,
          String apellido,
          String dni,
          String email,
          String password,
          String telefono,
          Cargo cargo,
          Trabajador gestor,
          List<Trabajador> trabajadoresACargo,
          List<RangoHorario> rangosHorariosTrabajador) {
    this.idTrabajador = idTrabajador;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.telefono = telefono;
    this.cargo = cargo;
    this.gestor = gestor;
    this.trabajadoresACargo = trabajadoresACargo;
    this.rangosHorariosTrabajador = rangosHorariosTrabajador;
  }

  // Métodos getter y setter
  public Long getIdTrabajador() {
    return idTrabajador;
  }

  public void setIdTrabajador(Long idTrabajador) {
    this.idTrabajador = idTrabajador;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getApellido() {
    return apellido;
  }

  public void setApellido(String apellido) {
    this.apellido = apellido;
  }

  public String getDni() {
    return dni;
  }

  public void setDni(String dni) {
    this.dni = dni;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getTelefono() {
    return telefono;
  }

  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }

  public Cargo getCargo() {
    return cargo;
  }

  public void setCargo(Cargo cargo) {
    this.cargo = cargo;
  }

  public Trabajador getGestor() {
    return gestor;
  }

  public void setGestor(Trabajador gestor) {
    this.gestor = gestor;
  }

  public List<Trabajador> getTrabajadoresACargo() {
    return trabajadoresACargo;
  }

  public void setTrabajadoresACargo(List<Trabajador> trabajadoresACargo) {
    this.trabajadoresACargo = trabajadoresACargo;
  }

  public List<RangoHorario> getRangosHorariosTrabajador() {
    return rangosHorariosTrabajador;
  }

  public void setRangosHorariosTrabajador(List<RangoHorario> rangosHorariosTrabajador) {
    this.rangosHorariosTrabajador = rangosHorariosTrabajador;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Trabajador that = (Trabajador) o;
    return Objects.equals(idTrabajador, that.idTrabajador) && Objects.equals(nombre, that.nombre) && Objects.equals(apellido, that.apellido) && Objects.equals(dni, that.dni) && Objects.equals(email, that.email) && Objects.equals(password, that.password) && Objects.equals(telefono, that.telefono) && cargo == that.cargo;
  }

  @Override
  public int hashCode() {
    return Objects.hash(idTrabajador, nombre, apellido, dni, email, password, telefono, cargo);
  }

  @Override
  public String toString() {
    return "Trabajador{" +
            "idTrabajador=" + idTrabajador +
            ", nombre='" + nombre + '\'' +
            ", apellido='" + apellido + '\'' +
            ", dni='" + dni + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", telefono='" + telefono + '\'' +
            ", cargo=" + cargo +
            ", gestor=" + gestor +
            ", trabajadoresACargo=" + trabajadoresACargo +
            ", rangosHorariosTrabajador=" + rangosHorariosTrabajador +
            '}';
  }
}
