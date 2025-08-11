import { Router } from "express";
import { ParticipantsService } from "./participants.service";
import { participantsQueryParamsZod } from "./participants.type";

export const participantsRouter = Router();

const participantsService = new ParticipantsService();

participantsRouter.get("/", (req, res) => {
  const queryParams = req.query;

  const participantsQuery = participantsQueryParamsZod.safeParse(queryParams);

  if (participantsQuery.success) {
    const pages = participantsService.getParticipantPages(
      participantsQuery.data,
    );

    res.json({
      data: pages.pages,
      totalPages: pages.totalPages,
    });
  } else {
    res.status(400).json({ error: participantsQuery.error });
  }
});
