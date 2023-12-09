import React, { useState, useEffect } from 'react';
import { Grid, TablePagination, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import MUITable from '../layout/MUITable';
import { getPostsWithCommentCounts } from '../../services/ChartService';
import { PostWithCommentCount } from '../../models/Post';

const ChartsTab: React.FC = () => {
  const [posts, setPosts] = useState<PostWithCommentCount[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    getPostsWithCommentCounts().then(setPosts);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableHeaders = [
    { key: 'id', label: 'Post ID' },
    { key: 'title', label: 'Title' },
    { key: 'commentCount', label: 'Comment Count' },
  ];

  const currentData = posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const radarData = posts.map(post => ({
    subject: post.id,
    A: post.commentCount,
    fullMark: Math.max(...posts.map(p => p.commentCount))
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <MUITable data={currentData} headers={tableHeaders} />
        <TablePagination
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <h2>Line Chart - Comments per Post</h2>
          <LineChart width={500} height={300} data={posts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="commentCount" stroke="#8884d8" />
          </LineChart>

          <h2>Pie Chart - Comments per Post</h2>
          <PieChart width={400} height={400}>
            <Pie dataKey="commentCount" isAnimationActive={false} data={posts} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
              {posts.map((entry, index) => <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />)}
            </Pie>
            <Tooltip />
          </PieChart>

          <h2>Radar Chart - Comments per Post</h2>
          <RadarChart outerRadius={90} width={500} height={300} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, Math.max(...radarData.map(r => r.A))]}/>
            <Radar name="Comment" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartsTab;
