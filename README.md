<h1 align="center"> PROJECT FRONTEND: RETROLINK </h1>

<image src="./img/RetrolinkReadme.png" alt="RetroLink">

---

## Table of Contents :file_folder:

1. [Description :classical_building:](#description-classical_building)
2. [Stack :gear:](#stack-gear)
3. [Project :open_book:](#Project-open_book)
4. [Future functionalities :star2:](#Future-functionalities-star2)
5. [Link :dart:](#link-dart)
6. [Author :wave:](#author-wave)
7. [Acknowledgments :sparkling_heart:](#acknowledgments-sparkling_heart)

---

## Description :classical_building:

We carried out a frontend project for a potential tattoo and piercing shop. The project focuses on connecting the frontend with a previously developed database (available at the link we will provide shortly). The frontend should be able to manage the view of the services offered, the registration of new users, the access of registered users to their own profile with the possibility of editing some of their data, the request for appointments for the offered services, as well as their view and possibility of deletion. The super admin also has access to the entire list of users and can delete them.

---

## Stack :gear:

![alt text](./img/imgREADME/image.png) ![alt text](./img/imgREADME/image-1.png) ![alt text](./img/imgREADME/imageMysql.png)![alt text](./img/imgREADME/image-2.png) ![alt text](./img/imgREADME/image-13.png) ![alt text](./img/imgREADME/image-4.png) ![ ](./img/imgREADME/image-5.png) ![alt text](./img/imgREADME/image-6.png) ![ ](./img/imgREADME/image-7.png) ![alt text](./img/imgREADME/image-8.png) ![alt text](./img/imgREADME/image-9.png) ![alt text](./img/imgREADME/image-10.png) ![alt text](./img/imgREADME/image-11.png) ![alt text](./img/imgREADME/image-12.png) ![alt text](./img/imgREADME/image-14.png) ![Static Badge](https://img.shields.io/badge/TYPEORM-darkred?style=for-the-badge&logo=TS)

---

## Project :open_book:

### 1 - Local Installation:

<h4>BackEnd</h4>

- Go this root: https://github.com/MartaGBayona/project_BackEnd.git

- Clone repository.

    ``npm install``.

- Start Docker.

- Start MySql.

- Create a new schema to import data.

- Fill .env and bd.ts files with the corresponding data.

    ``npm run dev``.

    ``npm run run-migrations``.

- Copy the data from the SQL folder into MySQL and execute the import.

- Import file CollectorProject4Backend_GimenoBayonaMarta for Thunder Client

<h4>FrontEnd</h4>

- Clone this repository.
    `npm install`.
    `npm run dev`.
- Access localhost from the console view.

### 2 - Info to log 

- Super_admin:
```
_id: "1",
name: "super_admin",
email: "super_admin@email.com",
password: 123456,
role: "super_admin"
```

- Admin:
```
_id: "2",
name: "admin",
email: "'admin@email.com'",
password: 123456,
role: "admin"
```

- User:
```
_id: "3",
name: "'user1'",
email: "'user@email.com'",
password: 123456,
role: "user"
```

### 2 - Roots:

1. Home:


<image src="./img/imgREADME/Home.png" alt="Home">


2. Sevices:

<image src="./img/imgREADME/Servicios.png" alt="Services">


3. Profile

<image src="./img/imgREADME/Perfil.png" alt="Profile">



4. Appointments: 

<image src="./img/imgREADME/MisCitas.png" alt="Appointments">



5. New Appointment

### Bugs  :collision:

- There is no time restriction: past days and nighttime hours can be selected.
- Services are chosen by ID, not by name. The order is as follows:

    1 = Tatuajes personalizados

	2 = Tatuajes del catálogo

	3 = Restauración y rejuvenecimiento de trabajos

	4 = Colocación de piercings y dilataciones

	5 = Venta de piercings y otros artículos

<image src="./img/imgREADME/SolicitarCita.png" alt="New Appointment">


6. User(only super_admin):


<image src="./img/imgREADME/Usuarios.png" alt="Users">


7. Log:

<image src="./img/imgREADME/Logeo.png" alt="Log">


8. Register:

<image src="./img/imgREADME/Registro.png" alt="Register">

---

## Future functionalities :star2:

- Date and time restrictions when requesting an appointment

- Ability to modify service and date in an already scheduled appointment

- More comprehensive user registration

- Modification of more parameters in the user profile

- Allow super admin to create and modify services

- Create dropdown in header and in service request

- Add images to backend services

- Footer design

- Responsive design

- Deploy backend and frontend



---

## Link :dart:

https://github.com/MartaGBayona/projectFrontend.git

---

## Author :wave:

- **Marta Gimeno Bayona**
- [GitHub](https://github.com/MartaGBayona) - [LinkedIn](https://www.linkedin.com/in/martagbayona/)

---

## Acknowledgments  :sparkling_heart:

My most sincere thanks to all my colleagues. Especially to [<i class="fab fa-github"></i> Pedro](https://github.com/Eryhnar), [<i class="fab fa-github"></i> Marina](https://github.com/marinaescriva), [<i class="fab fa-github"></i> Ana](https://github.com/ariusvi) and [<i class="fab fa-github"></i> Carlos](https://github.com/CariblaGIT) for their invaluable help and support.
