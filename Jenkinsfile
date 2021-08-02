pipeline {
  agent any

   parameters {
    booleanParam(
      name: 'DEPLOY_IN_PROD',
      description: 'deploy in production ?',
      defaultValue: false,
    )
  }
  
  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout scm
      }
    }

    stage('run compose') {

      steps {
        script {
          if (env.BRANCH_NAME == 'dev') {
            if (params.DEPLOY_IN_PROD) {
              echo "deploying in prod : ${params.DEPLOY_IN_PROD}"
              sh 'docker-compose -f docker-compose-prod.yml  up -d --no-deps --build'
            } else {
                sh '''
                    docker-compose -f docker-compose-stage.yml  -d --no-deps --build
                  '''
             }
          } else if(env.BRANCH_NAME == 'dev'){
             sh 'docker-compose -f docker-compose-dev.yml  up -d --no-deps --build'
          }
        }
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
              scannerHome = tool 'sonarqube'
              sh 'ls -a'
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