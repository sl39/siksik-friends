FROM amazoncorretto:17
ARG JAR_FILE=build/libs/*.jar
COPY /var/jenkins/Auth/application-auth.yaml /src/main/resources/
COPY ${JAR_FILE} config.jar
EXPOSE 8888
ENTRYPOINT ["java", "-jar", "/config.jar"]

#Test Line
#Sucess - 인식