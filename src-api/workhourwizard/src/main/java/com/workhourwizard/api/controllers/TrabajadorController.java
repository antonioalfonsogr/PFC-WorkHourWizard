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

  @Autowired
  public TrabajadorController(TrabajadorService trabajadorService) {
    this.trabajadorService = trabajadorService;
  }

  @GetMapping("")
  public List<Trabajador> obtenerTrabajadores() {
    return this.trabajadorService.obtenerTrabajadores();
  }

  @GetMapping("/{id}")
  public Optional<Trabajador> optionalTrabajadorPorId(@PathVariable Long id) {
    return this.trabajadorService.obtenerTrabajadorPorId(id);
  }

  @PostMapping("")
  public Trabajador insertarTrabajador(@RequestBody Trabajador trabajador) {
    return this.trabajadorService.insertarTrabajador(trabajador);
  }

  @PutMapping("/{id}")
  public void actualizarTrabajador(@PathVariable Long id, @RequestBody Trabajador trabajador) {
    this.trabajadorService.actualizarTrabajador(id, trabajador);
  }

  @DeleteMapping("/{id}")
  public void eliminarTrabajador(@PathVariable Long id) {
    this.trabajadorService.eliminarTrabajador(id);
  }
}
