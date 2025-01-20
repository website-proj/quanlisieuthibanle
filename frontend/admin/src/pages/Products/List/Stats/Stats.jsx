import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stats.css';
import { Box, Typography } from '@mui/material';
import { FiShoppingCart } from 'react-icons/fi';
import { MdOutlineCategory } from "react-icons/md";
import { PiSubtractSquareBold } from "react-icons/pi";
import { BASE_URL, ENDPOINTS } from '/src/api/apiEndpoints';

const jwtToken = localStorage.getItem("jwtToken");

const Stats = () => {
  const [stats, setStats] = useState({
    subcategoriesCount: 0,
    productsCount: 0,
    categoriesCount: 0,
  });

  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      console.log('Fetching subcategoriesData...');
      const subcategoriesData = await fetch(`${BASE_URL}${ENDPOINTS.stats.subcategoriesCount}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      }).then((res) => res.json());
      console.log('subcategoriesData:', subcategoriesData);
      
      console.log('Fetching productsData...');
      const productsData = await fetch(`${BASE_URL}${ENDPOINTS.stats.productsCount}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      }).then((res) => res.json());
      console.log('productsData:', productsData);
      
      console.log('Fetching productsData...');
      const categoriesData = await fetch(`${BASE_URL}${ENDPOINTS.stats.categoriesCount}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      }).then((res) => res.json());
      console.log('categoriesData:', categoriesData);

      const mergedStats = {
        subcategoriesCount: subcategoriesData,
        productsCount: productsData.product_count,
        categoriesCount: categoriesData,
      };

      const keys = Object.keys(mergedStats);
      const duration = 300;
      const steps = 30;
      const intervalTime = duration / steps;

      keys.forEach((key) => {
        const target = mergedStats[key];
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
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
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
      count: stats.categoriesCount,
      path: '/categories-list',
    },
    {
      icon: <PiSubtractSquareBold className="icon" />,
      title: 'Danh mục con',
      count: stats.subcategoriesCount,
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
