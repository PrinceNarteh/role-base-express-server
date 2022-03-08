import { Request, Response, NextFunction } from 'express';

export const ROLES_LIST = {
  Admin: 5051,
  Editor: 1989,
  User: 2001,
};

export const verifyRoles = (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log(req.user);
    const result = req.user.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};
