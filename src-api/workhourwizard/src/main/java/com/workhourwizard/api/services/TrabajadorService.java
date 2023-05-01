package com.workhourwizard.api.services;

import com.workhourwizard.api.models.Trabajador;
import com.workhourwizard.api.repositories.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrabajadorService {

    @Autowired
    private TrabajadorRepository trabajadorRepository;

    public List<Trabajador> obtenerTrabajadores() {
        return (List<Trabajador>) this.trabajadorRepository.findAll();
    }

    public Optional<Trabajador> obtenerTrabajadorPorId(Long idTrabajador) {
        return Optional.of(this.trabajadorRepository.findById(idTrabajador).orElseThrow());
    }

    public Trabajador insertarTrabajador(Trabajador trabajador) {
        trabajador.setPassword(new BCryptPasswordEncoder().encode(trabajador.getPassword()));
        return this.trabajadorRepository.save(trabajador);
    }

    public void actualizarTrabajador(Long idTrabajador, Trabajador trabajador) {
        Trabajador updateTrabajador = this.trabajadorRepository.findById(idTrabajador).orElseThrow();
        updateTrabajador.setNombre(trabajador.getNombre());
        updateTrabajador.setApellido(trabajador.getApellido());
        updateTrabajador.setDni(trabajador.getDni());
        updateTrabajador.setEmail(trabajador.getEmail());
        updateTrabajador.setPassword(trabajador.getPassword());
        updateTrabajador.setTelefono(trabajador.getTelefono());
        updateTrabajador.setCargo(trabajador.getCargo());
        updateTrabajador.setGestor(trabajador.getGestor());
        this.trabajadorRepository.save(updateTrabajador);
    }

    public void eliminarTrabajador(Long idTrabajador) {
        Trabajador trabajador = this.trabajadorRepository.findById(idTrabajador).orElseThrow();
        this.trabajadorRepository.deleteById(trabajador.getIdTrabajador());
    }
}
