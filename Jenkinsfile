pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout scm
      }
    }

    stage('run compose') {
      steps {
        sh 'docker-compose  up -d '
      }
    }

    stage('tests') {
      parallel {
        stage('test karma') {
          steps {
            echo 'test with karma here'
          }
        }
        stage('SonarQube analysis') {
          steps {
            
              withSonarQubeEnv('sonarqube') {
                sh 'SonarScanner 4.0/bin/sonar-scanner'
              }
          }

        }
      }
    }
  }
}