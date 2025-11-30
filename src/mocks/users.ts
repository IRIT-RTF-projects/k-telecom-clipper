import type { User } from "../types/Admin";

export const mockUsers: User[] = [
  { id: 'u1', login: 'ivan', email: 'ivan@example.com', registrationDate: '2023-01-01', lastLogin: '2023-11-21', streamCount: 3, isActive: true, assignedStreams: ['s1','s3','s12'] },
  { id: 'u2', login: 'olga', email: 'olga@example.com', registrationDate: '2023-02-12', lastLogin: '2023-11-20', streamCount: 1, isActive: true, assignedStreams: ['s1'] },
  { id: 'u3', login: 'petr', email: 'petr@example.com', registrationDate: '2023-03-05', lastLogin: '2023-11-19', streamCount: 1, isActive: true, assignedStreams: ['s6'] },
  { id: 'u4', login: 'anna', email: 'anna@example.com', registrationDate: '2023-04-01', lastLogin: '2023-11-19', streamCount: 1, isActive: true, assignedStreams: ['s8'] },
  { id: 'u5', login: 'oleg', email: 'oleg@example.com', registrationDate: '2023-04-05', lastLogin: '2023-11-18', streamCount: 0, isActive: true, assignedStreams: [] },
  { id: 'u6', login: 'masha', email: 'masha@example.com', registrationDate: '2023-05-10', lastLogin: '2023-11-17', streamCount: 0, isActive: true, assignedStreams: [] },
  { id: 'u7', login: 'sergey', email: 'sergey@example.com', registrationDate: '2023-05-20', lastLogin: '2023-11-16', streamCount: 1, isActive: true, assignedStreams: ['s10'] },
  { id: 'u8', login: 'irina', email: 'irina@example.com', registrationDate: '2023-06-01', lastLogin: '2023-11-15', streamCount: 2, isActive: true, assignedStreams: ['s12','s17'] },
  { id: 'u9', login: 'dmitry', email: 'dmitry@example.com', registrationDate: '2023-06-11', lastLogin: '2023-11-14', streamCount: 1, isActive: true, assignedStreams: ['s12'] },
  { id: 'u10', login: 'natasha', email: 'natasha@example.com', registrationDate: '2023-07-01', lastLogin: '2023-11-13', streamCount: 1, isActive: true, assignedStreams: ['s15'] },
  { id: 'u11', login: 'andrey', email: 'andrey@example.com', registrationDate: '2023-08-01', lastLogin: '2023-11-12', streamCount: 2, isActive: true, assignedStreams: ['s17'] },
  { id: 'u12', login: 'ksenia', email: 'ksenia@example.com', registrationDate: '2023-08-05', lastLogin: '2023-11-11', streamCount: 2, isActive: true, assignedStreams: ['s17'] },
  { id: 'u13', login: 'max', email: 'max@example.com', registrationDate: '2023-09-01', lastLogin: '2023-11-10', streamCount: 1, isActive: true, assignedStreams: ['s19'] },
  { id: 'u14', login: 'oleg2', email: 'oleg2@example.com', registrationDate: '2023-10-01', lastLogin: '2023-11-09', streamCount: 1, isActive: true, assignedStreams: ['s23'] },
];
