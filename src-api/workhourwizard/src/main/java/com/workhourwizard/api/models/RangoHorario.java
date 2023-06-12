package com.workhourwizard.api.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Objects;

@Entity
@Table(name = "rango_horario")
public class RangoHorario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_rango_horario", unique = true, nullable = false)
  private Long idRangoHorario;

  @Column(name = "fecha_hora_inicio", nullable = false)
  private ZonedDateTime fechaHoraInicio;

  @Column(name = "fecha_hora_fin", nullable = false)
  private ZonedDateTime fechaHoraFin;

  @Column(name = "verificado")
  private Boolean verificado;

  @ManyToOne(targetEntity = Trabajador.class)
  @JoinColumn(name = "id_trabajador")
  @JsonBackReference
  private Trabajador trabajador;

  // Constructores
  public RangoHorario() {}

  public RangoHorario(Long idRangoHorario, ZonedDateTime fechaHoraInicio, ZonedDateTime fechaHoraFin, Boolean verificado, Trabajador trabajador) {
    this.idRangoHorario = idRangoHorario;
    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;
    this.verificado = verificado;
    this.trabajador = trabajador;
  }

  // Métodos getter y setter
  public Long getIdRangoHorario() {
    return idRangoHorario;
  }

  public void setIdRangoHorario(Long idRangoHorario) {
    this.idRangoHorario = idRangoHorario;
  }

  public ZonedDateTime getFechaHoraInicio() {
    return fechaHoraInicio;
  }

  public void setFechaHoraInicio(ZonedDateTime fechaHoraInicio) {
    this.fechaHoraInicio = fechaHoraInicio;
  }

  public ZonedDateTime getFechaHoraFin() {
    return fechaHoraFin;
  }

  public void setFechaHoraFin(ZonedDateTime fechaHoraFin) {
    this.fechaHoraFin = fechaHoraFin;
  }

  public Boolean getVerificado() {
    return verificado;
  }

  public void setVerificado(Boolean verificado) {
    this.verificado = verificado;
  }

  public Trabajador getTrabajador() {
    return trabajador;
  }

  public void setTrabajador(Trabajador trabajador) {
    this.trabajador = trabajador;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    RangoHorario that = (RangoHorario) o;
    return Objects.equals(idRangoHorario, that.idRangoHorario) && Objects.equals(fechaHoraInicio, that.fechaHoraInicio) && Objects.equals(fechaHoraFin, that.fechaHoraFin) && Objects.equals(verificado, that.verificado);
  }

  @Override
  public int hashCode() {
    return Objects.hash(idRangoHorario, fechaHoraInicio, fechaHoraFin, verificado);
  }

  @Override
  public String toString() {
    return "RangoHorario{" +
            "idRangoHorario=" + idRangoHorario +
            ", fechaHoraInicio=" + fechaHoraInicio +
            ", fechaHoraFin=" + fechaHoraFin +
            ", verificado=" + verificado +
            ", trabajador=" + trabajador +
            '}';
  }
}
