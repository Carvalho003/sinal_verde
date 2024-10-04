  // ** É necessário importar a biblioteca - caminho: Sketch - Includde Library - ADD.library ZIP - Selecionar o arquivo ZIP **
  // Selecionar o Arduino Uno
  #include "Ultrasonic.h" // importa a biblioteca

  const int PINO_TRIGGER = 12; //define as portas dos pinos - Produz a onda ultrassônica
  const int PINO_ECHO = 13; // - Captura a volta da onda ultrassônica

  HC_SR04 sensor(PINO_TRIGGER, PINO_ECHO); //função do sensor

  void setup(){
    Serial.begin(9600); // Inicia a comunicação serial a 9600 bauds (medida de velocidade de sinalização)
  }
    // Serial.print("Distância: "); // saída = "Distância: "
  void loop(){
     //Define o nome do sensor.distance como distancia
    Serial.println(sensor.distance()); // saída da medida (em cm)
   

    //Serial.println(" cm"); // saída " cm"
    delay(500); // tempo em milisegundos (1 segundo)
  }