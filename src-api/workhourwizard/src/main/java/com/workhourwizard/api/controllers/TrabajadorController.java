package com.workhourwizard.api.controllers;

import com.workhourwizard.api.models.Trabajador;
import com.workhourwizard.api.services.TrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trabajador")
public class TrabajadorController {

  private final TrabajadorService trabajadorService;

  @Autowired
  public TrabajadorController(TrabajadorService trabajadorService) {
    this.trabajadorService = trabajadorService;
  }

  @GetMapping("")
  public List<Trabajador> obtenerTrabajadores() {
    return trabajadorService.obtenerTrabajadores();
  }

  @GetMapping("/{id}")
  public Optional<Trabajador> optionalTrabajadorPorId(@PathVariable Long id) {
    return trabajadorService.obtenerTrabajadorPorId(id);
  }

  @GetMapping("/email/{email}")
  public Optional<Trabajador> optionalTrabajadorPorEmail(@PathVariable String email) {
    return trabajadorService.obtenerTrabajadorPorEmail(email);
  }

  @PostMapping("")
  public Trabajador insertarTrabajador(@RequestBody Trabajador trabajador) {
    return trabajadorService.insertarTrabajador(trabajador);
  }

  @PutMapping("/{id}")
  public void actualizarTrabajador(@PathVariable Long id, @RequestBody Trabajador trabajador) {
    trabajadorService.actualizarTrabajador(id, trabajador);
  }

  @DeleteMapping("/{id}")
  public void eliminarTrabajador(@PathVariable Long id) {
    trabajadorService.eliminarTrabajador(id);
  }

  /**
   * Obtiene el gestor de un trabajador.
   *
   * @param id ID del trabajador.
   * @return Gestor del trabajador.
   */
  @GetMapping("/{id}/gestor")
  public ResponseEntity<Trabajador> obtenerGestor(@PathVariable Long id) {
    Optional<Trabajador> gestorOptional = trabajadorService.obtenerGestor(id);
    if (gestorOptional.isPresent()) {
      Trabajador gestor = gestorOptional.get();
      return ResponseEntity.ok(gestor);
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}

