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
            script {
              scannerHome = tool 'SonarQube Scanner 4.6.2.2472'
            }
            withSonarQubeEnv('sonarqube') {
              sh "${scannerHome}/bin/sonar-scanner"
            }
        }
      }

      }
    }
  }
}