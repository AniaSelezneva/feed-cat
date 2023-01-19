import { FoodItem } from "../interface/foodItem";
import messages from "../data_source/messages.json";
import "./Card.css";
import { useEffect, useRef, useState } from "react";
import { Msgs } from "../interface/msgs";

interface CardProps {
  item: FoodItem;
}

// Border and weight bubble colors
enum Colors {
  BLUE = "blue",
  RED = "red",
  GREY = "grey",
  YELLOW = "yellow",
}

const switchMainColor = (cardRef: any, color: string): void => {
  cardRef.current.style.background = `var(--${color}-card-color)`;
  cardRef.current.getElementsByClassName(
    "weight"
  )[0].style.background = `var(--${color}-card-color)`;
};

const switchTopTipColor = (cardRef: any, color: string): void => {
  const tip = cardRef.current.getElementsByClassName("top_tip")[0];
  if (color === "grey") {
    tip.style.color = `var(--grey-text-color)`;
  } else tip.style.color = `var(--${color}-card-color)`;
};

const switchBottomTipColor = (cardRef: any, color: string): void => {
  const tip = cardRef.current.getElementsByClassName("msg_for_empty")[0];
  if (tip) {
    tip.style.color = `var(--${color}-text-color)`;
  }
};

function Card(props: CardProps) {
  const { item } = props;
  const msgs: Msgs = JSON.parse(JSON.stringify(messages));

  const [isPicked, setIsPicked] = useState<boolean | undefined>(undefined);
  const [topTip, setTopTip] = useState<string>(msgs.default);
  const [bottomTip, setBottomTip] = useState<any>(item.info);

  const cardRef = useRef<any>();

  const handleClick = (): void => {
    if (item.quantity) {
      setIsPicked(!isPicked);
    }
  };

  const handleMouseLeave = (): void => {
    if (isPicked) {
      setTopTip(msgs.picked);
      switchTopTipColor(cardRef, Colors.RED);
    }
  };

  const handleBuyClick = (): void => {
    setIsPicked(true);
    switchMainColor(cardRef, Colors.RED);
    setBottomTip(item.info);
  };

  useEffect(() => {
    if (isPicked === undefined && !item.quantity) {
      switchMainColor(cardRef, Colors.GREY);
      setBottomTip(item.message_when_out_of);
    } else if (isPicked) {
      switchMainColor(cardRef, Colors.RED);
      setBottomTip(item.info);
    } else if (!isPicked && item.quantity) {
      switchTopTipColor(cardRef, Colors.GREY);
      switchMainColor(cardRef, Colors.BLUE);
      setTopTip(msgs.default);
      setBottomTip(
        <p className="info">
          {msgs.motivation}
          <span className="buy" onClick={handleBuyClick}>
            {msgs.link_to_buy}
          </span>
        </p>
      );
    }
  }, [isPicked]);

  return (
    <div className="wrapper">
      <div
        className="card"
        ref={cardRef}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
      >
        <div className="content">
          {!item.quantity && <div className="overlay" />}
          <div className="main">
            <p className="top_tip">{topTip}</p>
            <div className="main_info">
              <h2>{item.name}</h2>
              <h4>{item.text}</h4>
            </div>
            <div className="additional_info">
              <p>{item.portions}</p>
              <p>{item.mice}</p>
              {item.extra ? <p>{item.extra}</p> : null}
            </div>
          </div>

          <img alt="cat" src="./src/assets/kitty.png" />

          <div className="weight">
            <p className="weight_num">{item.weight}</p>
            <p className="weight_unit">кг</p>
          </div>
        </div>
      </div>
      <div className={`${"info"}${!item.quantity ? " msg_for_empty" : ""}`}>
        {bottomTip}
      </div>
    </div>
  );
}

export default Card;
