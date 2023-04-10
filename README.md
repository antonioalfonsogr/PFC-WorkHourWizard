
# WorkHourWizard

#### Curso Escolar 2022-2023
#### Autor: [Antonio Alfonso González Rodríguez](https://github.com/antonioalfonsogr/PFC-WorkHourWizard)
#### Tutor: [José María García Durán](https://github.com/iesalixar/plantilla_proyecto_iesalixar)
#### Fecha de Inicio: 01-04-2023
#### Fecha de Finalización: 14-06-2023

## Breve descripción del proyecto

La aplicación web consiste en un gestor de horas de trabajo. En la que los usuarios trabajadores pueden seleccionar las horas disponibles que tienen esa semana, 
y los usuarios gestores podrán seleccionar a los empleados que finalmente realicen el trabajo de cada hora entre los trabajadores disponibles.

Esta misma lógica podría adaptarse para seleccionar horas libres, horas extras, días de vacaciones o similares, dependiendo de las necesidades del negocio que se quieran cubrir. 

## Definir el objetivo de la aplicación

**Motivación**

La idea surge al ver en una empresa que tiene empleados que trabajan por hora, los cuales periodiamente comunican las horas que tienen disponibles, y se asignan las horas de trabajo entre las horas dispobles de cada uno. Esta tarea se realiza con solo la ayuda de un excel y teniendo que recoger manualmente las horas disponibles de cada trabajador y adaptarlas a las horas de trabajo a cubrir. Con esta aplicación podría mejorarse los tiempos dedicados en esa tarea. 

Aun así la principal motivación de esta aplicación es meramente académica. Permitiendome trabajar todas las áreas de los diferentes módulos del ciclo formativo.

**Funcionalidades**

Sin estar logueado solo será posible loguearse o registrarse como trabajador o gestor. 
Los gestores deberán ser verificados por el administrador de la plataforma.

**Los usuarios trabajadores:**

Tendrán dos vistas. Una en la que verán un calendario de la semana actual. Con las horas que trabajan esta semana. Otra con un calendario de la próxima semana donde podrán seleccionar las horas disponibles para trabajar la próxima semana. El plazo para poner dicha horas serán lunes y martes.


**Los usuarios gestores:**

Tendrán también dos vistas. Una con el calendario de la semana actual, donde verán todas las horas con el trabajador/es que las realizan. La segunda con el calendario de la siguiente semana donde podrán seleccionar qué trabajador realiza cada hora de entre los disponibles. El plazo para que los gestores seleccionen los trabajadores será miércoles y jueves. Los viernes se podrá confirmar la semana para que el sistema esté preparado para realizar los cambios de semana.

**Los usuarios administradores:**

Podrán listar los usuarios trabajadores y gestores y realizar las gestiones de usuarios básicas. 

**Stack Tecnológico.**

El backend java-11 con spring-boot.

La base de datos MySQL.

El frontend Angular.


## Estructura del Proyecto

- src-api
- src-frontend
- docs
- README.md
