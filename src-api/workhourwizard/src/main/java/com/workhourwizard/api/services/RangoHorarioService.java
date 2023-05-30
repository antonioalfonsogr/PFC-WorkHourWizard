package com.workhourwizard.api.services;

import com.workhourwizard.api.models.RangoHorario;
import com.workhourwizard.api.models.Trabajador;
import com.workhourwizard.api.repositories.RangoHorarioRepository;
import com.workhourwizard.api.repositories.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RangoHorarioService {

    private final RangoHorarioRepository rangoHorarioRepository;
    private final TrabajadorRepository trabajadorRepository;

    @Autowired
    public RangoHorarioService(RangoHorarioRepository rangoHorarioRepository, TrabajadorRepository trabajadorRepository) {
        this.rangoHorarioRepository = rangoHorarioRepository;
        this.trabajadorRepository = trabajadorRepository;
    }

    public List<RangoHorario> obtenerRangosHorarios(Long idTrabajador) {
        return (List<RangoHorario>) rangoHorarioRepository.findAll();
    }


    public Optional<RangoHorario> obtenerRangoHorarioPorId(Long idRangoHorario) {
        return rangoHorarioRepository.findById(idRangoHorario);
    }

    public RangoHorario insertarRangoHorario(Long idTrabajador, RangoHorario rangoHorario) {
        Trabajador trabajador = trabajadorRepository.findById(idTrabajador)
                .orElseThrow(() -> new NoSuchElementException("Trabajador no encontrado"));
        rangoHorario.setTrabajador(trabajador);
        rangoHorario.setVerificado(false);
        return rangoHorarioRepository.save(rangoHorario);
    }

    public void actualizarRangoHorario(Long idRangoHorario, RangoHorario rangoHorario) {
        RangoHorario updateRangoHorario = rangoHorarioRepository.findById(idRangoHorario)
                .orElseThrow(() -> new NoSuchElementException("Rango horario no encontrado"));
        updateRangoHorario.setFechaHoraInicio(rangoHorario.getFechaHoraInicio());
        updateRangoHorario.setFechaHoraFin(rangoHorario.getFechaHoraFin());
        updateRangoHorario.setVerificado(rangoHorario.getVerificado());
        updateRangoHorario.setTrabajador(rangoHorario.getTrabajador());
        rangoHorarioRepository.save(updateRangoHorario);
    }

    public void eliminarRangoHorario(Long idRangoHorario) {
        rangoHorarioRepository.deleteById(idRangoHorario);
    }
}




