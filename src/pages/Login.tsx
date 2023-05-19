import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import ION from '../assets/ion.svg';
import Intro from '../components/Intro';

const Login: React.FC = () => {

    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(false);

    const doLogin = (event: any) => {
        event.preventDefault();
        console.log('doLogin');
        // router.push('/home', 'root');
    };

    const finishIntro = async() => {
        console.log('FIN');
        setIntroSeen(true);
    }

    return (
        <>
            {!introSeen ? (
                <Intro onFinish={finishIntro} />
            ) : (
            <IonPage>
                <IonHeader>
                    <IonToolbar color={'success'}>
                        <IonTitle>Ionic React App</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent scrollY={false}>
                    <div className="ion-text-center ion-padding">
                        <img 
                            src={ION} 
                            alt="Ion logo" 
                            width={"50%"}
                        />
                    </div>
                    <IonCard>
                        <IonCardContent>
                            <form onSubmit={doLogin}>
                                <IonInput 
                                    fill="outline" 
                                    labelPlacement="floating" 
                                    label="Email" 
                                    type="email" 
                                    placeholder="your@email.com"
                                ></IonInput>
                                <IonInput 
                                    className="ion-margin-top" 
                                    fill="outline" 
                                    labelPlacement="floating" 
                                    label="Password" 
                                    type="password" 
                                    placeholder="Your password"
                                ></IonInput>
                                <IonButton 
                                    className="ion-margin-top" 
                                    type="submit" 
                                    expand="block"
                                >
                                    Login
                                    <IonIcon 
                                        icon={logInOutline} 
                                        slot="end"
                                    ></IonIcon>
                                </IonButton>
                                <IonButton 
                                    className="ion-margin-top" 
                                    color={"secondary"} 
                                    type="button" 
                                    expand="block"
                                    routerLink="/register"
                                >
                                    Create account
                                    <IonIcon 
                                        icon={personCircleOutline} 
                                        slot="end"
                                    ></IonIcon>
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonPage>
            )}
        </>
    );
};

export default Login;