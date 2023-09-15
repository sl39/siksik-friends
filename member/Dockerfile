FROM amazoncorretto:17
ARG JAR_FILE=build/libs/*.jar
# COPY /var/jenkins_home/Auth/application-auth.yaml /src/main/resources/
COPY ${JAR_FILE} member.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/member.jar"]
