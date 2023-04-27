package com.workhourwizard.api.services;

import com.workhourwizard.api.models.RangoHorario;
import com.workhourwizard.api.repositories.RangoHorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RangoHorarioService {

    @Autowired
    private RangoHorarioRepository rangoHorarioRepository;

    public List<RangoHorario> obtenerRangosHorarios(Long idTrabajador) {
        return (List<RangoHorario>) this.rangoHorarioRepository.findAll();
    }

    public Optional<RangoHorario> obtenerRangoHorarioPorId(Long idRangoHorario) {
        return Optional.of(this.rangoHorarioRepository.findById(idRangoHorario).orElseThrow());
    }

    public RangoHorario insertarRangoHorario(Long idTrabajador, RangoHorario rangoHorario) {
        rangoHorario.setTrabajador(rangoHorarioRepository.findById(idTrabajador).orElseThrow().getTrabajador());
        return this.rangoHorarioRepository.save(rangoHorario);
    }

    public void actualizarRangoHorario(Long idRangoHorario, RangoHorario rangoHorario) {
       RangoHorario updateRangoHorario = this.rangoHorarioRepository.findById(idRangoHorario).orElseThrow();
        updateRangoHorario.setFechaHoraInicio(rangoHorario.getFechaHoraInicio());
        updateRangoHorario.setFechaHoraFin(rangoHorario.getFechaHoraFin());
        updateRangoHorario.setVerificado(rangoHorario.getVerificado());
        updateRangoHorario.setTrabajador(rangoHorario.getTrabajador());
        this.rangoHorarioRepository.save(updateRangoHorario);
    }

    public void eliminarRangoHorario(Long idRangoHorario) {
        RangoHorario rangoHorario = this.rangoHorarioRepository.findById(idRangoHorario).orElseThrow();
        this.rangoHorarioRepository.deleteById(rangoHorario.getIdRangoHorario());
    }
}
