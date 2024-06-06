import { IonContent, IonPage, IonItem, IonInput } from '@ionic/react';
import { useState, useEffect } from 'react';
import MovingCircles from '../components/MovingCircles';
import FpsAndResourceMonitor from '../components/FpsAndResourceMonitor';

const Home: React.FC = () => {
  const [circleCount, setCircleCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [initialLoadTime, setInitialLoadTime] = useState<string>('N/A');
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleInputChange = (event: CustomEvent) => {
    const value = event.detail.value as string;
    setInputValue(value);
    setCircleCount(parseInt(value) || 0);
    setStartTime(performance.now());
  };

  useEffect(() => {
    if (circleCount > 0 && startTime !== null) {
      const timer = setTimeout(() => {
        setInitialLoadTime((performance.now() - startTime).toFixed(2) + " ms");
        setStartTime(null);
      }, 0); 

      return () => clearTimeout(timer);
    }
  }, [circleCount, startTime]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonItem>
          <IonInput
            value={inputValue}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <MovingCircles circleCount={circleCount} />
        <FpsAndResourceMonitor initialLoadTime={initialLoadTime} />
        <IonItem>
          <IonInput type="number"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
