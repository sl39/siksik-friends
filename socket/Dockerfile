FROM amazoncorretto:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} socket.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "/socket.jar"]