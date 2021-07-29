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
  

          def scannerHome = tool 'SonarScanner 4.0';
          steps {
              withSonarQubeEnv('sonarqube') {
                "${scannerHome}/bin/sonar-scanner"
              }
          }

        }
      }
    }
  }
}