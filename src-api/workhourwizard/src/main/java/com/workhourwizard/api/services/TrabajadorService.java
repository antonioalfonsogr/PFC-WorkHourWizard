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

  /**
   * Obtiene todos los trabajadores.
   *
   * @return Lista de trabajadores
   */
  public List<Trabajador> obtenerTrabajadores() {
    return (List<Trabajador>) trabajadorRepository.findAll();
  }

  /**
   * Obtiene un trabajador por su ID.
   *
   * @param idTrabajador ID del trabajador
   * @return Trabajador (si existe)
   */
  public Optional<Trabajador> obtenerTrabajadorPorId(Long idTrabajador) {
    return trabajadorRepository.findById(idTrabajador);
  }

  /**
   * Inserta un nuevo trabajador.
   *
   * @param trabajador Trabajador a insertar
   * @return Trabajador insertado
   */
  public Trabajador insertarTrabajador(Trabajador trabajador) {
    trabajador.setPassword(new BCryptPasswordEncoder().encode(trabajador.getPassword()));
    return trabajadorRepository.save(trabajador);
  }

  /**
   * Actualiza un trabajador existente.
   *
   * @param idTrabajador ID del trabajador a actualizar
   * @param trabajador   Datos del trabajador actualizado
   */
  public void actualizarTrabajador(Long idTrabajador, Trabajador trabajador) {
    Optional<Trabajador> optionalTrabajador = trabajadorRepository.findById(idTrabajador);
    if (optionalTrabajador.isPresent()) {
      Trabajador updateTrabajador = optionalTrabajador.get();
      updateTrabajador.setNombre(trabajador.getNombre());
      updateTrabajador.setApellido(trabajador.getApellido());
      updateTrabajador.setDni(trabajador.getDni());
      updateTrabajador.setEmail(trabajador.getEmail());
      updateTrabajador.setPassword(trabajador.getPassword());
      updateTrabajador.setTelefono(trabajador.getTelefono());
      updateTrabajador.setCargo(trabajador.getCargo());

        // Actualiza el gestor
        if (trabajador.getGestor() != null) {
            Trabajador nuevoGestor = trabajadorRepository.findById(trabajador.getGestor().getIdTrabajador()).orElse(null);
            updateTrabajador.setGestor(nuevoGestor);
        } else {
            updateTrabajador.setGestor(null);
        }

      // Actualiza la lista de trabajadoresACargo
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


  /**
   * Elimina un trabajador por su ID.
   *
   * @param idTrabajador ID del trabajador a eliminar
   */
  public void eliminarTrabajador(Long idTrabajador) {
    Optional<Trabajador> optionalTrabajador = trabajadorRepository.findById(idTrabajador);
    optionalTrabajador.ifPresent(trabajador -> trabajadorRepository.deleteById(trabajador.getIdTrabajador()));
  }
}
