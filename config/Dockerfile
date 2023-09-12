FROM amazoncorretto:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} config.jar
ENTRYPOINT ["java", "-jar", "/config.jar"]
