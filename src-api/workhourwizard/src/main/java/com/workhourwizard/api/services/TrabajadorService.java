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

  private final TrabajadorRepository trabajadorRepository;

  @Autowired
  public TrabajadorService(TrabajadorRepository trabajadorRepository) {
    this.trabajadorRepository = trabajadorRepository;
  }

  public List<Trabajador> obtenerTrabajadores() {
    return (List<Trabajador>) trabajadorRepository.findAll();
  }

  public Optional<Trabajador> obtenerTrabajadorPorId(Long idTrabajador) {
    return trabajadorRepository.findById(idTrabajador);
  }

  public Optional<Trabajador> obtenerTrabajadorPorEmail(String email) {
    return trabajadorRepository.findOneByEmail(email);
  }

  public Trabajador insertarTrabajador(Trabajador trabajador) {
    trabajador.setPassword(new BCryptPasswordEncoder().encode(trabajador.getPassword()));
    return trabajadorRepository.save(trabajador);
  }

  public void actualizarTrabajador(Long idTrabajador, Trabajador trabajador) {
    Optional<Trabajador> optionalTrabajador = trabajadorRepository.findById(idTrabajador);
    if (optionalTrabajador.isPresent()) {
      Trabajador updateTrabajador = optionalTrabajador.get();
      updateTrabajador.setNombre(trabajador.getNombre());
      updateTrabajador.setApellido(trabajador.getApellido());
      updateTrabajador.setDni(trabajador.getDni());
      updateTrabajador.setEmail(trabajador.getEmail());
      updateTrabajador.setTelefono(trabajador.getTelefono());
      updateTrabajador.setCargo(trabajador.getCargo());

      if (!trabajador.getPassword().isEmpty()) {
        String hashedPassword = new BCryptPasswordEncoder().encode(trabajador.getPassword());
        updateTrabajador.setPassword(hashedPassword);
      }

      if (trabajador.getGestor() != null) {
        Trabajador nuevoGestor = trabajadorRepository.findById(trabajador.getGestor().getIdTrabajador()).orElse(null);
        updateTrabajador.setGestor(nuevoGestor);
      } else {
        updateTrabajador.setGestor(null);
      }

      if (trabajador.getTrabajadoresACargo() != null) {
        for (Trabajador trabajadorACargo : trabajador.getTrabajadoresACargo()) {
          Trabajador trabajadorActualizado = trabajadorRepository.findById(trabajadorACargo.getIdTrabajador()).orElse(null);
          if (trabajadorActualizado != null) {
            trabajadorActualizado.setGestor(updateTrabajador);
            updateTrabajador.getTrabajadoresACargo().add(trabajadorActualizado);
          }
        }
      }

      trabajadorRepository.save(updateTrabajador);
    }
  }

  public void eliminarTrabajador(Long idTrabajador) {
    Optional<Trabajador> optionalTrabajador = trabajadorRepository.findById(idTrabajador);
    optionalTrabajador.ifPresent(trabajador -> trabajadorRepository.deleteById(trabajador.getIdTrabajador()));
  }

  /**
   * Obtiene el gestor de un trabajador.
   *
   * @param id ID del trabajador.
   * @return Gestor del trabajador (si existe).
   */
  public Optional<Trabajador> obtenerGestor(Long id) {
    return trabajadorRepository.findById(id).map(Trabajador::getGestor);
  }
}
