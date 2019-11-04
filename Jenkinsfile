pipeline 
{
     agent 
     {
         docker
          {
            image 'maven:3-alpine'
         }
    } 
    stages 
     {
        stage('Build') 
         {
              steps 
              {
                sh 'mvn -B -DskipTests clean package'
              }
          }

        stage('Test') 
        {
            steps {
                //sh 'mvn test'
                sh 'echo "test"'
            }
            post {
                always {
                    sh 'echo "test"'
                }
            }
        }

        stage('Deliver for development')
        {
                    when {
                        branch 'develop'
                    }
                    steps {
                        sh 'mvn -B spring-boot:run'
                        input message: 'Finished using the web site? (Click "Proceed" to continue)'
                    }
        }

        stage('Deploy for production')
        {
            when {
                branch 'production'
            }
            steps {
                sh './jenkins/scripts/deploy-for-production.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }

        stage('Deliver') {
        when {
              branch 'production'
           }
            steps {
                sh 'bash ./jenkins/deliver.sh'
            }
        }
		
		stage('Deploy'){
			steps {
				sh 'echo "Deploying to Tomcat at http://tomcat:8080/HealthyOauthServer-0.0.1-SNAPSHOT"'
				sh 'curl -s --upload-file /home/jenkins/workspace/HeatlhyOauthServer/target/HealthyOauthServer-0.0.1-SNAPSHOT.war "http://udeploy:Deploy2019*@ip-172-31-38-16.us-east-2.compute.internal:8080/manager/text/deploy?path=/HealthyOauthServer-0.0.1-SNAPSHOT&update=true"'
            }
		}
    }

}