package com.workhourwizard.api.controllers;

import com.workhourwizard.api.models.Trabajador;
import com.workhourwizard.api.services.TrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trabajador")
public class TrabajadorController {

  private final TrabajadorService trabajadorService;

  /**
   * Constructor del controlador.
   *
   * @param trabajadorService Servicio del trabajador.
   */
  @Autowired
  public TrabajadorController(TrabajadorService trabajadorService) {
    this.trabajadorService = trabajadorService;
  }

  /**
   * Obtiene todos los trabajadores.
   *
   * @return Lista de trabajadores.
   */
  @GetMapping("")
  public List<Trabajador> obtenerTrabajadores() {
    return this.trabajadorService.obtenerTrabajadores();
  }

  /**
   * Obtiene un trabajador por su ID.
   *
   * @param id ID del trabajador.
   * @return Trabajador encontrado.
   */
  @GetMapping("/{id}")
  public Optional<Trabajador> optionalTrabajadorPorId(@PathVariable Long id) {
    return this.trabajadorService.obtenerTrabajadorPorId(id);
  }

  /**
   * Inserta un nuevo trabajador.
   *
   * @param trabajador Trabajador a insertar.
   * @return Trabajador insertado.
   */
  @PostMapping("")
  public Trabajador insertarTrabajador(@RequestBody Trabajador trabajador) {
    return this.trabajadorService.insertarTrabajador(trabajador);
  }

  /**
   * Actualiza un trabajador.
   *
   * @param id         ID del trabajador.
   * @param trabajador Trabajador con los datos actualizados.
   */
  @PutMapping("/{id}")
  public void actualizarTrabajador(@PathVariable Long id, @RequestBody Trabajador trabajador) {
    this.trabajadorService.actualizarTrabajador(id, trabajador);
  }

  /**
   * Elimina un trabajador.
   *
   * @param id ID del trabajador a eliminar.
   */
  @DeleteMapping("/{id}")
  public void eliminarTrabajador(@PathVariable Long id) {
    this.trabajadorService.eliminarTrabajador(id);
  }
}

