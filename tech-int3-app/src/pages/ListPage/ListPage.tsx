import React from 'react';
import { Container, Box, CircularProgress, Typography, Pagination, Stack } from '@mui/material';
import { Filters } from '../../components/list-components/Filters/Filters';
import { useAds } from '../../shared/hooks/useAds';
import { CardList } from '../../components/list-components/CardList/CardList';

export const ListPage: React.FC = () => {
   const {
      ads,
      loading,
      error,
      page: currentPage,
      totalPages,
      totalItems,
      setFilters,
      setPage,
   } = useAds();

   const handleFiltersChange = (newFilters: any) => {
      setFilters(newFilters);
   };

   const handlePageChange = (_: React.ChangeEvent<unknown>, pageNum: number) => {
      setPage(pageNum);
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   if (error) {
      return (
         <Container sx={{ mt: 15, textAlign: 'center' }} className="fade-in">
            <Typography color="error">{error}</Typography>
         </Container>
      );
   }

   return (
      <Container sx={{ mt: 15 }} className="fade-in">
         <Filters onFiltersChange={handleFiltersChange} />

         {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
               <CircularProgress />
            </Box>
         ) : ads.length === 0 ? (
            <Typography sx={{ mt: 4, textAlign: 'center' }}>Объявления не найдены</Typography>
         ) : (
            <>
               <CardList ads={ads} />

               {totalPages > 1 && (
                  <Stack alignItems="center" sx={{ pt: 4 }}>
                     <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                     />
                  </Stack>
               )}

               {!loading && (
                  <Typography
                     sx={{
                        p: 3,
                        fontSize: '0.95rem',
                        color: 'text.secondary',
                        textAlign: 'center',
                     }}
                  >
                     Показано на странице: {ads.length} • Общее количество: {totalItems}
                  </Typography>
               )}
            </>
         )}
      </Container>
   );
};
