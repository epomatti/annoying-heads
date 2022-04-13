import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from './heads.module.css'
import HeadMachine from './HeadMachine';

const headMachine: HeadMachine = new HeadMachine();

const AnnoyingHeads = () => {

  const [firstTime, setFirstTime] = useState(true);

  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const time = 2000;
    setTimeout(() => {
      setTrigger(trigger + 1);
      setFirstTime(false);
    }, time);
  }, [trigger]);

  const randomHead = headMachine.getRandomHead();
  const HeadDiv = randomHead.animatedDiv;
  const divClass = firstTime ? styles.hidden : styles.visible;

  return (
    <div className={divClass}>
      <HeadDiv>
        <Image
          src={randomHead.image}
          height={120}
          width={120}
          alt=""
          loading="eager"
          priority
        />
      </HeadDiv>
    </div>
  )
}

export default AnnoyingHeads;