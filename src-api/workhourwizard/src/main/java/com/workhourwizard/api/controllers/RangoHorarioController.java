package com.workhourwizard.api.controllers;

import com.workhourwizard.api.models.RangoHorario;
import com.workhourwizard.api.services.RangoHorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/{idTrabajador}/rangohorario")
public class RangoHorarioController {

    private final RangoHorarioService rangoHorarioService;

    @Autowired
    public RangoHorarioController(RangoHorarioService rangoHorarioService){
        this.rangoHorarioService = rangoHorarioService;
    }

    @GetMapping("")
    public List<RangoHorario> obtenerRangosHorarios(@PathVariable(name = "idTrabajador") Long idTrabajador){
        return this.rangoHorarioService.obtenerRangosHorarios(idTrabajador);
    }

    @GetMapping("/{id}")
    public Optional<RangoHorario> obtenerRangoHorarioPorId(@PathVariable Long id){
        return this.rangoHorarioService.obtenerRangoHorarioPorId(id);
    }


    @PostMapping("")
    public RangoHorario insertarRangoHorario(@PathVariable(name = "idTrabajador") Long idTabajador, @RequestBody RangoHorario rangoHorario){
        return this.rangoHorarioService.insertarRangoHorario(idTabajador,rangoHorario);
    }

    @PutMapping("/{id}")
    public void actualizarRangoHorario(@PathVariable Long id, @RequestBody RangoHorario rangoHorario){
        this.rangoHorarioService.actualizarRangoHorario(id, rangoHorario);
    }

    @DeleteMapping("/{id}")
    public void eliminarRangoHorario(@PathVariable Long id){
        this.rangoHorarioService.eliminarRangoHorario(id);
    }

}
