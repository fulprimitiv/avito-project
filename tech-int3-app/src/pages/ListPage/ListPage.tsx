import React from 'react';
import { Container, Box } from '@mui/material';
import Filters from '../../components/Filters/Filters';
import Card from '../../components/Card/Card';

const ListPage: React.FC = () => {
  return (
    <Container sx={{ mt: 15 }}>
      <Filters />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 3,
          mt: 4,
        }}
      >
        {/* ПОМЕНЯТЬ НА НОРМ ДАННЫЕ / АДАПТИВ НА МОБИЛКУ */}
        <Card
          title="IPhone 13"
          price={65000}
          category="Электроника"
          date="2025-01-10"
          status="approved"
          priority="normal"
        />

        <Card
          title="Кроссовки Nike"
          price={12000}
          category="Одежда"
          date="2025-01-12"
          status="rejected"
          priority="fast"
        />

        <Card
          title="Ноутбук ASUS"
          price={45000}
          category="Электроника"
          date="2025-01-05"
          status="moderation"
          priority="normal"
        />

        <Card
          title="IPhone 13"
          price={65000}
          category="Электроника"
          date="2025-01-10"
          status="approved"
          priority="normal"
        />

        <Card
          title="Кроссовки Nike"
          price={12000}
          category="Одежда"
          date="2025-01-12"
          status="rejected"
          priority="fast"
        />

        <Card
          title="Ноутбук ASUS"
          price={45000}
          category="Электроника"
          date="2025-01-05"
          status="moderation"
          priority="normal"
        />

        <Card
          title="IPhone 13"
          price={65000}
          category="Электроника"
          date="2025-01-10"
          status="approved"
          priority="normal"
        />

        <Card
          title="Кроссовки Nike"
          price={12000}
          category="Одежда"
          date="2025-01-12"
          status="rejected"
          priority="fast"
        />

        <Card
          title="Ноутбук ASUS"
          price={45000}
          category="Электроника"
          date="2025-01-05"
          status="moderation"
          priority="normal"
        />

        <Card
          title="IPhone 13"
          price={65000}
          category="Электроника"
          date="2025-01-10"
          status="approved"
          priority="normal"
        />

        <Card
          title="Кроссовки Nike"
          price={12000}
          category="Одежда"
          date="2025-01-12"
          status="rejected"
          priority="fast"
        />

        <Card
          title="Ноутбук ASUS"
          price={45000}
          category="Электроника"
          date="2025-01-05"
          status="moderation"
          priority="normal"
        />
      </Box>
    </Container>
  );
};

export default ListPage;
