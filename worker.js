const ZB = require('zeebe-node')
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()

// Create a Zeebe client
const zeebeClient = new ZB.ZBClient();

// Worker to handle "Absage senden" task
zeebeClient.createWorker({
    taskType: 'absage_senden', 
    taskHandler: async job => {
      try {
        await zeebeClient.publishMessage({
          correlationKey: 12345, 
          messageId: 'Event_0r3miz9', 
          name: 'absage_bekommen', 
          variables: {
          },
        });
  
        console.log("Die Absage wurde zum Kandidat gesendet");
        job.complete(); 
      } catch (error) {
        job.error('Error occurred while starting Kandidat process:', error);
      }
    },
  });

// Worker to handle "Vertrag zusenden" task
zeebeClient.createWorker({
  taskType: 'vertrag_zusenden', 
  taskHandler: async job => {
    try {
      await zeebeClient.publishMessage({
        correlationKey: 1234567, 
        messageId: 'Event_00mr2uy', 
        name: 'vertrag_bekommen', 
        variables: {
        },
      });

      console.log("Der Vertrag wurde zum Kandidat gesendet");
      job.complete(); 
    } catch (error) {
      job.error('Error occurred while starting Kandidat process:', error);
    }
  },
});

// Worker to handle "Kandidat schickt seine Antwort" task
zeebeClient.createWorker({
    taskType: 'kandidat_antwort_schicken', 
    taskHandler: async job => {
      const kandidat_nachricht = job.variables.kandidat_nachricht;
      try {
        await zeebeClient.publishMessage({
          correlationKey: 12345678, 
          messageId: 'Activity_0sslwo9', 
          name: 'nachricht_von_kandidat_bekommen', 
          variables: {
            kandidat_nachricht: kandidat_nachricht,
          },
        });
        
        console.log("Der Kandidat hat seine Antwort gesendet");
        job.complete(); 
      } catch (error) {
        job.error('Error occurred while starting Kandidat process:', error);
      }
    },
  });





