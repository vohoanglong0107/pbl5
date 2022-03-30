# Exploding Kittens Board Game

## Setup

Run the following command to bring up the whole project:

        docker-compose up -d

Or the following for myphpadmin and mariadb only:

        docker network create mysql_default
        docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mysql -e MYSQL_DATABASE=mysql -e MYSQL_USER=mysql -e MYSQL_PASSWORD=mysql --name mysql -v ${PWD}/db:/var/lib/mysql --network mysql_default mariadb:10
        docker run --rm --name myadmin -d -e PMA_HOST=mysql --network mysql_default -p 8080:80 phpmyadmin

Then turn on the backend or frontend services by:

        cd backend # frontend
        npm run dev
