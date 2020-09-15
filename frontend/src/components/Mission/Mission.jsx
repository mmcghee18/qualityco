import React, { useEffect } from "react";
import {
  MissionWrapper,
  MissionTitle,
  MissionDescription,
  PromiseCards,
  PromiseIcon,
} from "../../styles/styles.js";
import PromiseCard from "./PromiseCard.jsx";

const Mission = ({ setLoading, setHome }) => {
  // Since this page doesn't make any requests and setLoading(false) afterwards
  useEffect(() => {
    setLoading(false);
    setHome(false);
  }, []);

  return (
    <MissionWrapper>
      <MissionTitle>
        We believe it should be simple to find well-made, sustainable, and
        beautiful products.
      </MissionTitle>
      <MissionDescription>
        QualityCo is a brand discovery platform that connects socially-minded
        consumers with independent brands committed to developing high-quality,
        ethically-made products. With QualityCo’s convenient platform, shoppers
        can quickly and confidently find well-made goods and purchase from
        brands that align with their values.
      </MissionDescription>
      <MissionTitle>Our Promise</MissionTitle>
      <PromiseCards>
        <PromiseCard
          icon={<PromiseIcon icon="star" />}
          title="Quality"
          description="Every product we feature meets the highest standards for craftsmanship, materials, and aesthetic."
        />
        <PromiseCard
          icon={<PromiseIcon icon="leaf" />}
          title="Sustainability"
          description="All brands must practice sustainable sourcing, manufacturing, and distribution practices."
        />
        <PromiseCard
          icon={<PromiseIcon icon="hand-holding-heart" />}
          title="Goodness"
          description="Advocate for socially-responsible business practices with every purchase."
        />
      </PromiseCards>
    </MissionWrapper>
  );
};

export default Mission;
