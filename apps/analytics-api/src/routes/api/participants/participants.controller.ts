import { Router } from "express";
import { ParticipantsService } from "./participants.service";
import { participantsQueryParamsZod } from "./participants.type";

export const participantsRouter = Router();

const participantsService = new ParticipantsService();

participantsRouter.get("/", (req, res) => {
  const queryParams = req.query;

  const participantsQuery = participantsQueryParamsZod.safeParse(queryParams);

  if (participantsQuery.success) {
    res.json({
      data: participantsService.getParticipantPages(participantsQuery.data),
    });
  } else {
    res.status(400).json({ error: participantsQuery.error });
  }
});
