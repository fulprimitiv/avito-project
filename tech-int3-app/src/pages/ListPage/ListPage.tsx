import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Typography, Pagination, Stack } from '@mui/material';
import Filters from '../../components/Filters/Filters';
import Card from '../../components/Card/Card';
import { getAdsList } from '../../api/adsService';
import type { Ad, FiltersState } from '../../shared/types/adsTypes';
import { STATUS_TO_CARD_STATUS } from '../../shared/constants/adsConstants';

const ListPage: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<FiltersState>({
    status: [],
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const fetchAds = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdsList({
        page,
        limit: 10,
        ...filters,
      });
      setAds(data.ads);
      setTotalPages(data.pagination.totalPages);
      setTotalItems(data.pagination.totalItems ?? data.ads.length ?? 0);
      setCurrentPage(page);
    } catch (err) {
      setError('Ошибка при загрузке объявлений');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds(1);
  }, [filters]);

  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    fetchAds(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <Container sx={{ mt: 15, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 15 }}>
      <Filters onFiltersChange={handleFiltersChange} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : ads.length === 0 ? (
        <Typography sx={{ mt: 4, textAlign: 'center' }}>Объявления не найдены</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 3,
              mt: 4,
            }}
          >
            {ads.map((ad) => (
              <Card
                key={ad.id}
                image={ad.images[0]}
                title={ad.title}
                price={ad.price}
                category={ad.category}
                date={new Date(ad.createdAt).toLocaleDateString('ru-RU')}
                status={STATUS_TO_CARD_STATUS[ad.status]}
                priority={ad.priority}
              />
            ))}
          </Box>

          {totalPages > 1 && (
            <Stack
              alignItems="center"
              sx={{ pt: 4 }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          )}

          {!loading && (
            <Typography sx={{ p: 3, fontSize: '0.95rem', color: 'text.secondary', textAlign: 'center' }}>
              Показано на странице: {ads.length} • Общее количество: {totalItems}
            </Typography>
          )}
        </>
      )}
    </Container>

  );
};

export default ListPage;
