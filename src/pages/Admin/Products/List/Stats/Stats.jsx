import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stats.css';
import { Box, Typography } from '@mui/material';
import {FiShoppingCart } from 'react-icons/fi';
import { MdOutlineCategory } from "react-icons/md";
import { PiSubtractSquareBold } from "react-icons/pi";
import statsData from './Stats.json';

const Stats = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    usersCount: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const keys = Object.keys(statsData);
    const duration = 300;
    const steps = 30;
    const intervalTime = duration / steps;

    keys.forEach((key) => {
      const target = statsData[key];
      const increment = Math.ceil(target / steps);
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setStats((prevStats) => ({
          ...prevStats,
          [key]: current,
        }));
      }, intervalTime);
    });
  }, []);

  const formatCount = (count) => {
    if (count >= 1000000000) return `${(count / 1000000000).toFixed(2)}B`;
    if (count >= 1000000) return `${(count / 1000000).toFixed(2)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(2)}K`;
    return count;
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const statsItems = [
    {
        icon: <FiShoppingCart className="icon" />,
        title: 'Sản phẩm',
        count: stats.productsCount,
        path: '/products-list',
      },
    {
      icon: <MdOutlineCategory className="icon" />,
      title: 'Danh mục',
      count: stats.ordersCount,
      path: '/categories-list',
    },
    {
      icon: <PiSubtractSquareBold  className="icon" />,
      title: 'Danh mục con',
      count: stats.productsCount,
      path: '/subcategories-list',
    },
  ];

  return (
    <Box className="stats-header-container2">
      {statsItems.map((item, index) => (
        <Box
          key={index}
          className="info-box"
          onClick={() => handleNavigate(item.path)}
          style={{ cursor: 'pointer' }}
        >
          {item.icon}
          <Box>
            <Typography className="info-title">{item.title}</Typography>
            <Typography className="info-count">{formatCount(item.count)}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Stats;
