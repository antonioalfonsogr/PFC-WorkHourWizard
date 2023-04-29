package com.workhourwizard.api.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
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

  @ManyToOne(fetch = FetchType.LAZY, targetEntity = Trabajador.class)
  @JoinColumn(name = "id_trabajador")
  private Trabajador trabajador;
}
