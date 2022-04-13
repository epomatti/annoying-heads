import HeadPosition from "./HeadPosition";
import styled, { keyframes } from "styled-components";

interface HeadInterface {
  left: string;
  right: string;
  bottom: string;
}

const Trump: HeadInterface = {
  left: "trump",
  right: "trump",
  bottom: "trump",
}

const Obama: HeadInterface = {
  left: "obama-left",
  right: "obama-right",
  bottom: "obama-bottom",
}

const Hilary: HeadInterface = {
  left: "hilary",
  right: "hilary-right",
  bottom: "hilary",
}

const Kamala: HeadInterface = {
  left: "kamala-left",
  right: "kamala-right",
  bottom: "kamala-bottom",
}

const Biden: HeadInterface = {
  left: "biden",
  right: "biden-right",
  bottom: "biden",
}

const imageDir = "/assets/heads";


const heads: HeadInterface[] = [Trump, Obama, Hilary, Kamala, Biden];
const positions: HeadPosition[] = [HeadPosition.LEFT, HeadPosition.RIGHT, HeadPosition.BOTTOM];

export interface RandomHead {
  image: string;
  position: HeadPosition;
  animatedDiv: any;
}

class HeadMachine {

  private randomHeight = () => {
    return Math.floor(Math.random() * 85);
  }

  private getLeftDiv = () => {
    const height = this.randomHeight();

    const keyFrames = keyframes`
          0% {
              left: -120px;
          }
          5% {
              left: -45px;                
          }
          95% {
              left: -45px;                
          } 
          100% {
              left: -120px;
          }
      `
    const HeadDiv = styled.div`
          position: fixed;
          animation: ${keyFrames} 2s linear;
          animation-timing-function: ease-in ;
          left: -120px;
          top: ${height}%;
          transform: rotate(45deg);
      `
    return HeadDiv;
  }

  private getRightDiv = () => {
    const height = this.randomHeight();

    const keyFrames = keyframes`
          0% {
              right: -120px;
          }
          5% {
              right: -45px;                
          }
          95% {
              right: -45px;                
          } 
          100% {
              right: -120px;
          }
      `
    const HeadDiv = styled.div`
          position: fixed;
          animation: ${keyFrames} 2s linear;
          animation-timing-function: ease-in ;
          right: -120px;
          top: ${height}%;
          transform: rotate(-45deg);
      `
    return HeadDiv;
  }

  private getBottomDiv = () => {

    const horizontal = Math.floor(Math.random() * 90);

    const keyFrames = keyframes`
          0% {
              bottom: -125px;
          }
          5% {
              bottom: -35px;                
          }
          95% {
              bottom: -35px;                
          } 
          100% {
              bottom: -125px;
          }
      `
    const HeadDiv = styled.div`
          position: fixed;
          animation: ${keyFrames} 2s linear;
          animation-timing-function: ease-in ;
          bottom: -125px;
          left: ${horizontal}%;
      `
    return HeadDiv;
  }

  private getRandomFromArray = (array: Array<any>) => {
    return array[Math.floor(Math.random() * array.length)];
  }

  private getRandomPosition = () => {
    return this.getRandomFromArray(positions);
  }

  private getRandomHeadElements = (position: HeadPosition) => {
    const head = this.getRandomFromArray(heads);
    let image;
    let animatedDiv;
    if (position === HeadPosition.LEFT) {
      image = head.left;
      animatedDiv = this.getLeftDiv();
    } else if (position === HeadPosition.RIGHT) {
      image = head.right;
      animatedDiv = this.getRightDiv();
    } else if (position === HeadPosition.BOTTOM) {
      image = head.bottom;
      animatedDiv = this.getBottomDiv();
    } else {
      throw `Invalid random position: ${position}`;
    }
    return { image: `${imageDir}/${image}.png`, animatedDiv: animatedDiv }
  }

  public getRandomHead = () => {
    const position = this.getRandomPosition();
    const elements = this.getRandomHeadElements(position);
    const randomHead: RandomHead = {
      image: elements.image,
      position: position,
      animatedDiv: elements.animatedDiv,
    }
    return randomHead;
  }

}

export default HeadMachine;