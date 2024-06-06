import { IonContent, IonHeader, IonPage, IonItem, IonInput } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useState } from 'react';
import MovingCircles from '../components/MovingCircles';
import FpsAndResourceMonitor from '../components/FpsAndResourceMonitor';

const Home: React.FC = () => {
  const [circleCount, setCircleCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: CustomEvent) => {
    const value = event.detail.value as string;
    setInputValue(value);
    setCircleCount(parseInt(value) || 0);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
      <div>
        <IonItem>
          <IonInput
            value={inputValue}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <MovingCircles circleCount={circleCount} />
        <FpsAndResourceMonitor />
      </div>
      <IonItem>
        <IonInput type="number"></IonInput>
      </IonItem>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
