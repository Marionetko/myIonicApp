import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import ION from '../assets/ion.svg';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {

    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(true);
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY });
            setIntroSeen(seen.value === 'true');
        }
        checkStorage();
    }, [])

    const doLogin = async (event: any) => {
        event.preventDefault();
        await present('Logging in...');
        setTimeout(async () => {
            dismiss();
            router.push('/app', 'root');
        }, 2000);
    };

    const finishIntro = async() => {
        setIntroSeen(true);
        Preferences.set({ key: INTRO_KEY, value: 'true' });
    }
    const seeIntroAgain = () => {
        setIntroSeen(false);
        Preferences.remove({ key: INTRO_KEY });
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

                <IonContent 
                    scrollY={false}
                    className='ion-padding'
                >
                    <IonGrid fixed>
                        <IonRow class='ion-justify-content-center'>
                            <IonCol 
                                size='12'
                                sizeMd='8'
                                sizeLg='6'
                                sizeXl='4'
                            >
                                <div className="ion-text-center ion-padding">
                                    <img 
                                        src={ION} 
                                        alt="Ion logo" 
                                        width={"50%"}
                                        />
                                </div>
                            </IonCol>
                        </IonRow>

                        <IonRow class='ion-justify-content-center'>
                            <IonCol 
                                size='12'
                                sizeMd='8'
                                sizeLg='6'
                                sizeXl='4'
                            >
                                <IonCard>
                                    <IonCardContent>
                                        <form onSubmit={doLogin}>
                                            <IonInput 
                                                mode='md'
                                                fill="outline" 
                                                labelPlacement="floating" 
                                                label="Email" 
                                                type="email" 
                                                placeholder="your@email.com"
                                            ></IonInput>
                                            <IonInput 
                                                mode='md'
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

                                            <IonButton
                                                onClick={seeIntroAgain} 
                                                fill='clear'
                                                size='small'
                                                className="ion-margin-top" 
                                                color={"medium"} 
                                                type="button" 
                                                expand="block"
                                            >
                                                Watch intro again
                                                <IonIcon 
                                                    icon={personCircleOutline} 
                                                    slot="end"
                                                ></IonIcon>
                                            </IonButton>
                                        </form>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    
                    
                </IonContent>
            </IonPage>
            )}
        </>
    );
};

export default Login;