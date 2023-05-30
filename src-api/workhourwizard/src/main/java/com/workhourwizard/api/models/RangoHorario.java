package com.workhourwizard.api.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rango_horario")
public class RangoHorario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_rango_horario", unique = true, nullable = false)
  private Long idRangoHorario;

  @Column(name = "fecha_hora_inicio", nullable = false)
  private LocalDateTime fechaHoraInicio;

  @Column(name = "fecha_hora_fin", nullable = false)
  private LocalDateTime fechaHoraFin;

  @Column(name = "verificado")
  private Boolean verificado;

  @ManyToOne(targetEntity = Trabajador.class)
  @JoinColumn(name = "id_trabajador")
  private Trabajador trabajador;

  public RangoHorario() {
  }

  public RangoHorario(Long idRangoHorario, LocalDateTime fechaHoraInicio, LocalDateTime fechaHoraFin, Boolean verificado, Trabajador trabajador) {
    this.idRangoHorario = idRangoHorario;
    this.fechaHoraInicio = fechaHoraInicio;
    this.fechaHoraFin = fechaHoraFin;
    this.verificado = verificado;
    this.trabajador = trabajador;
  }

  public Long getIdRangoHorario() {
    return idRangoHorario;
  }

  public void setIdRangoHorario(Long idRangoHorario) {
    this.idRangoHorario = idRangoHorario;
  }

  public LocalDateTime getFechaHoraInicio() {
    return fechaHoraInicio;
  }

  public void setFechaHoraInicio(LocalDateTime fechaHoraInicio) {
    this.fechaHoraInicio = fechaHoraInicio;
  }

  public LocalDateTime getFechaHoraFin() {
    return fechaHoraFin;
  }

  public void setFechaHoraFin(LocalDateTime fechaHoraFin) {
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
}

