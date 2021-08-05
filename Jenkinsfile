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
          if (env.BRANCH_NAME == 'master') {
            
              echo "deploying in prod : ${params.DEPLOY_IN_PROD}"
            if (params.DEPLOY_IN_PROD) {
              sh 'docker-compose -f docker-compose-prod.yml  up -d --no-deps --build'
            } else {
               sh '''
                    docker-compose -f docker-compose-stage.yml up -d --no-deps --build
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
     stage('Deploy Artifact To Nexus') {
      when {
        allOf {
          branch 'master'
          expression { !params.DEPLOY_IN_PROD }
        }
      }
      steps {
        

        script {
          filesByGlob = './'
          artifactPath = './'
          
          def packageJSON = readJSON file: 'package.json'
          def packageJSONVersion = packageJSON.version
          echo "${packageJSONVersion}"
          // Assign to a boolean response verifying If the artifact name exists
          artifactExists = fileExists artifactPath
          if (artifactExists) {
            nexusArtifactUploader(
              nexusVersion: 'nexus3',
              protocol: 'https',
              nexusUrl: 'nexus.dsp4-5archio19-ah-je-gh-yb.fr',
              groupId: 'com.dsp',
              version: "${packageJSONVersion}",
              repository: 'theTipTop_front/',
              credentialsId: 'nexus3',
              artifacts: [
                  [artifactId: 'theTipTop',
                  type:'tgz',
                  classifier: '',
                  file: "the-tip-top-front-${packageJSONVersion}.tgz"]
              ]
            )
          }
          else {
            error "*** File: ${artifactPath}, could not be found"
          }
        }
      }
    }


  }
}