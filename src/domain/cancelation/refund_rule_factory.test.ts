import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund copy";
import { PartialRefund } from "./partial_refund";
import { RefundRuleFactory } from "./refund_rule_factory";

describe("RefundRuleFactory", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const checkInDate = new Date('2025-01-10');
    const currentDate = new Date('2025-01-01');
    const timeDiff = checkInDate.getTime() - currentDate.getTime();
    const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const amount = 1000;

    const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
    expect(refundRule).toBeInstanceOf(FullRefund);
    expect(refundRule.calculateRefund(amount)).toBe(0);
  });

  it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
    const checkInDate = new Date('2025-01-10');
    const currentDate = new Date('2025-01-05');
    const timeDiff = checkInDate.getTime() - currentDate.getTime();
    const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const amount = 1000;

    const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
    expect(refundRule).toBeInstanceOf(PartialRefund);
    expect(refundRule.calculateRefund(amount)).toBe(500);
  });

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    const checkInDate = new Date('2025-01-10');
    const currentDate = new Date('2025-01-10');
    const timeDiff = checkInDate.getTime() - currentDate.getTime();
    const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const amount = 1000;

    const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
    expect(refundRule).toBeInstanceOf(NoRefund);
    expect(refundRule.calculateRefund(amount)).toBe(amount);
  });
});
