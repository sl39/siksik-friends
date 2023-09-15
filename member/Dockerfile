FROM amazoncorretto:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} member.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/member.jar"]

#Testing Line